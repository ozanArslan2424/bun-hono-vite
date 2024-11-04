import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /user!'
}
