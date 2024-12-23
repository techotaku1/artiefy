"use client";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import { Modal } from "~/components/modal/modal";

export default function inicio() {
  const [ismodalOpen, setismodalOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-4 text-2xl font-semibold">Inicio</h1>
        <Button
          onClick={() => setismodalOpen(true)}
          className={buttonVariants()}
        >
          Open Modal
        </Button>
        <Modal isOpen={ismodalOpen} closeModal={() => setismodalOpen(false)} />
      </div>
    </>
  );
}
