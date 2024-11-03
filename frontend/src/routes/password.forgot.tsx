import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/password/forgot')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /password/forgot!'
}
