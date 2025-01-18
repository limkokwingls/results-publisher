from typing import List, Optional
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build, Resource
import pandas as pd

CREDENTIALS_PATH: str = 'serviceAccountKey.json'
SPREADSHEET_ID: str = '1wBvea_dvs18fMmIH75bIhiZPKHKO_skkHjv3yhCp-NE'

def get_google_sheets_service(credentials_path: str) -> Resource:
    SCOPES: List[str] = ['https://www.googleapis.com/auth/spreadsheets']
    
    credentials: Credentials = Credentials.from_service_account_file(
        credentials_path, 
        scopes=SCOPES
    )
    
    service: Resource = build('sheets', 'v4', credentials=credentials)
    return service

def extract_student_numbers(
    service: Resource, 
    range_name: str = 'Sheet1!A2:A'
) -> List[str]:
    sheet = service.spreadsheets()
    result = sheet.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=range_name
    ).execute()
    
    values = result.get('values', [])
    student_numbers: List[str] = [row[0] for row in values if row]
    
    return student_numbers

def find_student_row(
    service: Resource, 
    spreadsheet_id: str, 
    student_number: str,
    range_name: str = 'Sheet1!A2:A'
) -> Optional[int]:
    sheet = service.spreadsheets()
    result = sheet.values().get(
        spreadsheetId=spreadsheet_id,
        range=range_name
    ).execute()
    
    values = result.get('values', [])
    
    for index, row in enumerate(values, start=2):
        if row and row[0] == student_number:
            return index
    
    return None

def mark_as_done(
    service: Resource,
    student_number: str
) -> bool:
    try:
        row_number: Optional[int] = find_student_row(service, SPREADSHEET_ID, student_number)
        
        if row_number is None:
            print(f"Student number {student_number} not found.")
            return False
            
        range_name: str = f'Sheet1!D{row_number}'
        body: dict = {
            'values': [['Unblocked']]
        }
        
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=range_name,
            valueInputOption='RAW',
            body=body
        ).execute()
        
        print(f"Successfully marked student {student_number} as Unblocked.")
        return True
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False


def get_student_status(
    service: Resource,
    student_number: str
) -> Optional[str]:
    try:
        row_number: Optional[int] = find_student_row(service, SPREADSHEET_ID, student_number)
        if row_number is None:
            print(f"Student number {student_number} not found.")
            return None
        range_name: str = f'Sheet1!D{row_number}'
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=range_name
        ).execute()
        values = result.get('values', [])
        return values[0][0] if values and values[0] else None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def main() -> None:
    try:
        service: Resource = get_google_sheets_service(CREDENTIALS_PATH)
        # student_numbers: List[str] = extract_student_numbers(service)
        print(get_student_status(service, '901015906'))
        # print("Extracted Student Numbers:")
        # for number in student_numbers:
        #     print(number)
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()