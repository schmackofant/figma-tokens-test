import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function IndexPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-3/6 rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Figma Design Tokens Test
        </h1>
        <Button size="lg">Mint IP-NFT</Button>
        <div className="mt-6 flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>
    </div>
  )
}
