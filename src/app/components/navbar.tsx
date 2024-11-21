"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { links } from "../utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStep } from "../context/StepContext";

const Header = () => {
  const pathname = usePathname();
  const { currentStep } = useStep();
  const [activePath, setActivePath] = useState(pathname);

  const totalSteps = 3;

  const isUploadFlow = pathname === "/upload";
  const isUploadSuccess = pathname === "/success";
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="main-container flex justify-between items-center px-3 py-3 sm:px-10 sm:py-4 ">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={160} height={44} />
          </Link>
          {!isUploadFlow && !isUploadSuccess && (
            <>
              <div className="hidden md:flex items-center gap-10">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    className={`uppercase px-2 py-1 ${
                      activePath === link.href
                        ? "bg-main font-bold"
                        : "font-medium"
                    }`}
                    href={link.href}
                    onClick={() => setActivePath(link.href)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Button
                customClass="flex items-center gap-2 whitespace-nowrap"
                title="Contact us"
                href="/form"
                sufix={
                  <svg
                    width="16"
                    height="13"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.293 1.12625C8.48053 0.938781 8.73484 0.833466 9 0.833466C9.26516 0.833466 9.51947 0.938781 9.707 1.12625L15.707 7.12625C15.8945 7.31378 15.9998 7.56809 15.9998 7.83325C15.9998 8.09842 15.8945 8.35273 15.707 8.54025L9.707 14.5403C9.5184 14.7224 9.2658 14.8232 9.0036 14.8209C8.7414 14.8187 8.49059 14.7135 8.30518 14.5281C8.11977 14.3427 8.0146 14.0919 8.01233 13.8297C8.01005 13.5675 8.11084 13.3149 8.293 13.1263L12.586 8.83325H1C0.734784 8.83325 0.48043 8.7279 0.292893 8.54036C0.105357 8.35282 0 8.09847 0 7.83325C0 7.56804 0.105357 7.31368 0.292893 7.12615C0.48043 6.93861 0.734784 6.83325 1 6.83325H12.586L8.293 2.54025C8.10553 2.35272 8.00021 2.09842 8.00021 1.83325C8.00021 1.56809 8.10553 1.31378 8.293 1.12625Z"
                      fill="#000"
                    />
                  </svg>
                }
              />
            </>
          )}

          {isUploadFlow && (
            <div className="ml-8 w-full h-[20px] border border-[#060606] rounded-full">
              <div
                className={`h-full bg-[#D0FB48] rounded-full`}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          )}

          {isUploadSuccess && (
            <div className="ml-8 w-full h-[20px] border border-[#060606] rounded-full">
              <div className={`h-full bg-[#D0FB48] w-full rounded-full`} />
            </div>
          )}
        </div>
      </nav>
      <div className="h-[68px] md:h-[75px]" />
    </>
  );
};

export default Header;
