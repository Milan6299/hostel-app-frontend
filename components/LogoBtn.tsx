import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";

export default function LogoBtn(): ReactElement {
	return (
		<Link href={"/"} className="font-bold text-lg flex items-center gap-2">
			<div className="relative aspect-square w-8">
				<Image fill src={"/fm-logo.png"} alt="FMU" />
			</div>
			FMU Mess
		</Link>
	);
}
