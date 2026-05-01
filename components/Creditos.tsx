import LinkedinIcon from "./svg/LinkedinIcon"
import GithubIcon from "./svg/GithubIcon"
import { Separator } from "./ui/separator"

export default function Creditos() {
  return (
    <div className="flex items-center gap-2 absolute">
        <p>Alek Suso</p>
        <Separator orientation="vertical" />
        <LinkedinIcon />
        <Separator orientation="vertical" />
        <GithubIcon />
    </div>
  )
}
