"use client";
import Link from 'next/link'
import React from 'react'

export default function CommonMainNavigation() {
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-end lg:space-x-6 space-y-2 lg:space-y-0 py-4 lg:py-0">
      <li>
        <Link
          href="/fashion"
          className="block py-2 lg:py-4 px-4 lg:px-0 hover:text-primary"
        >
          Fashion
        </Link>
      </li>
      <li>
        <Link
          href="/electronics"
          className="block py-2 lg:py-4 px-4 lg:px-0 hover:text-primary"
        >
          Electronics
        </Link>
      </li>
      <li>
        <Link
          href="/home"
          className="block py-2 lg:py-4 px-4 lg:px-0 hover:text-primary"
        >
          Home & Living
        </Link>
      </li>
      <li>
        <Link
          href="/sports"
          className="block py-2 lg:py-4 px-4 lg:px-0 hover:text-primary"
        >
          Sports
        </Link>
      </li>
      <li>
        <Link
          href="/automotive"
          className="block py-2 lg:py-4 px-4 lg:px-0 hover:text-primary"
        >
          Automotive
        </Link>
      </li>
    </ul>
  )
}
