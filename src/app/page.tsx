// 'use client';
import { Box, Button, Group, Paper, Stack } from '@mantine/core';
import Link from 'next/link';
import { CSSProperties } from 'react';

const linkOverride: CSSProperties = {
  color: 'inherit',
  textDecoration: 'inherit',
};

export default function HomePage() {
  return (
    <Group>
      <Link href='/' style={linkOverride}>
        <Paper p='lg' style={{ minWidth: '50px', width: '500px' }} withBorder>
          Hello World
        </Paper>
      </Link>
      <Link href='/' style={linkOverride}>
        <Paper p='lg' style={{ minWidth: '50px', width: '500px' }} withBorder>
          Hello World
        </Paper>
      </Link>
    </Group>
  );
}
