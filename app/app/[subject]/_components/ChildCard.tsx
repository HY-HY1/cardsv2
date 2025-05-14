import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Stack } from "@/types/ResponseTypes"

// Accept the prop as `data: { stack: Stack }` or destructure it as `{ name, description }`
interface ChildCardProps {
  stack: Stack
}

const ChildCard: React.FC<ChildCardProps> = ({ stack }) => {
  return (
    <Card className="w-full min-w-[150px]">
      <CardHeader>
        <CardTitle>{stack.name}</CardTitle>
        <CardDescription>{stack.description}</CardDescription>
      </CardHeader>
      <CardContent>
        hello
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}

export default ChildCard
