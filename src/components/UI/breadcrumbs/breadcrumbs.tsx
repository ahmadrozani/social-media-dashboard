"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CustomPath {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  customPaths?: CustomPath[];
  className?: string;
}

const Breadcrumb = ({ customPaths }: BreadcrumbProps) => {
  const pathname = usePathname();
  const pathNameArray = pathname ? pathname.split("/") : [];

  const paths = pathNameArray
    .filter((path) => path !== "")
    .map((path) => {
      const firstLetter = path[0].toUpperCase();
      return { label: firstLetter + path.slice(1, path.length), path };
    });

  const currentPaths = customPaths || paths;

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-x-4 text-sm text-slate-500">
        {currentPaths.map((link: CustomPath, index: number) => (
          <li
            key={index}
            className={`${
              index === currentPaths.length - 1 ? "font-medium" : ""
            }`}
          >
            {index === currentPaths.length - 1 ? (
              <span>{link.label}</span>
            ) : (
              <span className="flex items-center gap-x-4">
                <Link href={link.path}>{link.label}</Link>
                <ChevronRight color="#94A3B8" size={16} strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
