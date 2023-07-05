import { Button } from "../components/ui/button"
import { Meta } from "@storybook/react"
import { ChevronRight, Loader2, Mail } from "lucide-react"
import Link from "next/link"

const meta: Meta = {
  title: "Button",
  component: Button,
}

export const Default = () => <Button>Button</Button>
Default.storyName = "Default"

export const Secondary = () => <Button variant="secondary">Secondary</Button>
Secondary.storyName = "Secondary"

export const Destructive = () => (
  <Button variant="destructive">Destructive</Button>
)
Destructive.storyName = "Destructive"

export const Outline = () => <Button variant="outline">Outline</Button>
Outline.storyName = "Outline"

export const Ghost = () => <Button variant="ghost">Ghost</Button>
Ghost.storyName = "Ghost"

export const Icon = () => (
  <Button>
    <ChevronRight className="h-4 w-4" />
  </Button>
)
Icon.storyName = "Icon"

export const IconOnly = () => (
  <Button>
    <Mail className="h-4 w-4" />
  </Button>
)
IconOnly.storyName = "Icon Only"

export const Loading = () => (
  <Button disabled>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Please wait
  </Button>
)
Loading.storyName = "Loading"

export const WithIcon = () => (
  <Button>
    <Mail className="mr-2 h-4 w-4" />
    Login with Email
  </Button>
)
WithIcon.storyName = "With Icon"

export const AsChild = () => (
  <Button>
    <Link href="/">Login</Link>
  </Button>
)
AsChild.storyName = "As Child"

export default meta
