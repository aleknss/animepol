import LinkedinIcon from "./svg/LinkedinIcon";
import GithubIcon from "./svg/GithubIcon";
import { Separator } from "./ui/separator";

export default function Creditos() {
  return (
    <div className="flex items-center gap-2 relative">
      <a href="https://alek.is-a.dev/" className="hover:text-primary transition duration-250" target="_blank">
        <p>Alek Suso</p>
      </a>
      <Separator orientation="vertical" />
      <a href="https://www.linkedin.com/in/alek-suso-bondoc-b91b15294/" className="hover:text-primary transition duration-250" target="_blank">
        <LinkedinIcon />
      </a>
      <Separator orientation="vertical" />
      <a href="https://github.com/aleknss" className="hover:text-primary transition duration-250" target="_blank">
        <GithubIcon />
      </a>
    </div>
  );
}
