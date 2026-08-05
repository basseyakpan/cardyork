"use client";
import React from "react";
import { FiPhone, FiMail, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface DirectContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectContactModal({
  isOpen,
  onClose,
}: DirectContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-on-surface">Direct Support</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <svg
              className="w-5 h-5 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <p className="text-sm text-on-surface-variant mb-6">
          Reach us through any channel below:
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="tel:+2348026846656"
            className="flex items-center gap-4 p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
              <FiPhone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">
                Phone Call
              </p>
              <p className="font-bold text-on-surface">+234 (0) 802 684 6656</p>
            </div>
          </a>

          <a
            href="https://wa.me/2348026846656"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <FaWhatsapp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#25D366] font-medium">WhatsApp</p>
              <p className="font-bold text-on-surface">+234 (0) 802 684 6656</p>
            </div>
          </a>

          <a
            href="mailto:support@cardyork.com"
            className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-primary font-medium">Email</p>
              <Link target="_blank" href="mailto:support@cardyork.com">
                {" "}
                support@cardyork.com{" "}
              </Link>
            </div>
          </a>

          <a
            href="https://cardyork.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-secondary/10 rounded-xl hover:bg-secondary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
              <FiGlobe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-secondary font-medium">Website</p>
              <p className="font-bold text-on-surface">https://cardyork.com/</p>
            </div>
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <a
            href="https://cardyork.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline text-center"
          >
            Privacy Policy
          </a>
          <a
            href="https://cardyork.com/terms-and-conditions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline text-center"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  );
}
