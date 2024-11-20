import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Phone,
  HelpCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/category";
import DarkModeToggleButton from "./DarkModeToggleButton";
import MobileMenu from "./MobileDrawer";
import axios from "axios";
import CommonMainNavigation from "./CommonMainNavigation";

export default async function Navbar() {
  const response = await axios.get(
    "https://api.shope.com.bd/api/v1/public/hero-categories"
  );
  const categories: CategoryType[] = response.data;

  return (
    <div className="w-full bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* 1st Header section */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Helpline: 0964781656</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/become-seller" className="hover:text-primary">
              Become a Seller
            </Link>
            <Link href="/order-track" className="hover:text-primary">
              Order Track
            </Link>
            <Link href="/login" className="hover:text-primary">
              Sign up / Login
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Header Section  */}
      <div className="border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            alzaf
          </Link>
          <div className="flex items-center lg:order-last">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button className="ml-2 hidden sm:inline-flex">
              Cloud Service
            </Button>

            <DarkModeToggleButton />
            <MobileMenu />
          </div>
          <div className="w-full lg:flex-1 lg:mx-8 mt-4 lg:mt-0 order-last lg:order-none">
            <div className="flex w-full max-w-xl mx-auto lg:mx-0 items-center">
              <input
                type="search"
                placeholder="Search Product"
                className="w-full rounded-l-md border border-r-0 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
              />
              <Button size="icon" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b dark:border-gray-700 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Category Sidebar */}
            <div className="group relative w-full lg:w-64">
              <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <span className="font-medium">Categories</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {/* First Level Categories */}
              <div className="absolute lg:left-0 lg:top-full z-50 w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg hidden group-hover:block">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="group/item relative hover:bg-orange-100 dark:hover:bg-orange-800"
                  >
                    <div className="flex items-center justify-between dark:border-gray-700 px-4 py-1 hover:bg-orange-100 dark:hover:bg-orange-800">
                      <Link
                        href={category.link}
                        className="group-hover/item:text-orange-500"
                      >
                        {category.title}
                      </Link>
                      {category.childrens && (
                        <ChevronRight className="h-4 w-4 group-hover/item:text-orange-500" />
                      )}
                    </div>
                    {/* Second Level Categories */}
                    {category.childrens && (
                      <div className="lg:absolute lg:left-full lg:top-0 z-50 w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg hidden group-hover/item:block">
                        {category.childrens.map((child) => (
                          <div
                            key={child.id}
                            className="group/child relative hover:bg-orange-100 dark:hover:bg-orange-800"
                          >
                            <div className="flex items-center justify-between dark:border-gray-700 px-4 py-1 hover:bg-orange-100 dark:hover:bg-orange-800">
                              <Link
                                href={child.link}
                                className="group-hover/child:text-orange-500"
                              >
                                {child.title}
                              </Link>
                              {child.childrens && (
                                <ChevronRight className="h-4 w-4 group-hover/child:text-orange-500" />
                              )}
                            </div>
                            {/* Third Level Categories */}
                            {child.childrens && (
                              <div className="lg:absolute lg:left-full lg:top-0 z-50 w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg hidden group-hover/child:block">
                                {child.childrens.map((grandChild) => (
                                  <div
                                    key={grandChild.id}
                                    className="group/grandchild relative hover:bg-orange-100 dark:hover:bg-orange-800"
                                  >
                                    <div className="flex items-center justify-between dark:border-gray-700 px-4 py-1 hover:bg-orange-100 dark:hover:bg-orange-800">
                                      <Link
                                        href={grandChild.link}
                                        className="group-hover/grandchild:text-orange-500"
                                      >
                                        {grandChild.title}
                                      </Link>
                                      {grandChild.childrens && (
                                        <ChevronRight className="h-4 w-4 group-hover/grandchild:text-orange-500" />
                                      )}
                                    </div>
                                    {/* Fourth Level Categories */}
                                    {grandChild.childrens && (
                                      <div className="lg:absolute lg:left-full lg:top-0 z-50 w-full lg:w-64 bg-white dark:bg-gray-800 shadow-lg hidden group-hover/grandchild:block">
                                        {grandChild.childrens.map(
                                          (greatGrandChild) => (
                                            <Link
                                              key={greatGrandChild.id}
                                              href={greatGrandChild.link}
                                              className="block border-b dark:border-gray-700 px-4 py-1 hover:bg-orange-100 dark:hover:bg-orange-800"
                                            >
                                              {greatGrandChild.title}
                                            </Link>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Main Navigation of Features */}
            <nav className={`flex-1 hidden lg:block`}>
              <CommonMainNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
