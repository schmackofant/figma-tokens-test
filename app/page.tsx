import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-3/6 rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Figma Design Tokens Test
        </h1>
        <Button size="lg">Mint IP-NFT</Button>
      </div>
    </div>
  )
}
