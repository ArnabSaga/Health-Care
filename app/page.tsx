import Image from "next/image";

import PatientFrom from "@/components/forms/PatientFrom";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

    {/* TODO: OTP verfication  */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-16 w-fit"
          />

          <PatientFrom />

          <div className="text-14-regular m-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Healt Care</p>
            <Link href='/?admin=true' className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] "
      />
    </div>
  )
}
