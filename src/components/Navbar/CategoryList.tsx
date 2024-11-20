"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { CategoryType } from "@/types/category";

export default function CategoriesLists(
  { categories }: { categories: CategoryType[] } = {
    categories: [],
  }
) {
  // All states and refs
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<number | null>(
    null
  );
  const [hoveredThirdLevel, setHoveredThirdLevel] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeLevel, setActiveLevel] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  //   Check the is current mobile device or big screen device
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  //   Logic about the mouse hover leave and enter
  const handleMouseEnter = () => !isMobile && setIsOpen(true);
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
      setHoveredCategory(null);
      setHoveredSubCategory(null);
      setHoveredThirdLevel(null);
    }
  };

  //   Category and sub categories clicked function in mobile devices onlu
  const handleCategoryClick = (categoryId: number) => {
    if (isMobile) {
      setHoveredCategory(categoryId);
      setActiveLevel(1);
    }
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    if (isMobile) {
      setHoveredSubCategory(subCategoryId);
      setActiveLevel(2);
    }
  };

  const handleThirdLevelClick = (thirdLevelId: number) => {
    if (isMobile) {
      setHoveredThirdLevel(thirdLevelId);
      setActiveLevel(3);
    }
  };

  //   For mobile device back button functionality
  const handleBackClick = () => {
    if (activeLevel > 0) {
      setActiveLevel(activeLevel - 1);
      if (activeLevel === 1) setHoveredCategory(null);
      if (activeLevel === 2) setHoveredSubCategory(null);
      if (activeLevel === 3) setHoveredThirdLevel(null);
    } else {
      setIsOpen(false);
    }
  };

  // In initial render all things should be close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMouseLeave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " onMouseLeave={handleMouseLeave} ref={menuRef}>
      {/* Category button  */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        className="flex items-center justify-between bg-primary p-4 text-primary-foreground w-full lg:w-64 cursor-pointer"
      >
        <span className="font-medium">Categories</span>
        <ChevronDown className="h-4 w-4" />
      </div>

      {isOpen && (
        <div
          className={`absolute top-full left-0 flex bg-white dark:bg-gray-900 rounded-lg shadow-lg border z-50 ${
            isMobile ? "flex-col w-full" : ""
          }`}
        >
          {/* Main Categories */}
          <div
            className={`py-2 border-r ${isMobile ? "w-full" : "w-64"} ${
              isMobile && activeLevel > 0 ? "hidden" : ""
            }`}
          >
            {isMobile && activeLevel > 0 && (
              <div
                onClick={handleBackClick}
                className="flex items-center px-4 py-2 cursor-pointer text-primary"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </div>
            )}
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center gap-3 px-4 py-2 hover:bg-orange-50 dark:hover:bg-orange-300 cursor-pointer ${
                  hoveredCategory === category.id ? "text-orange-500" : ""
                }`}
                onMouseEnter={() => {
                  // First check for it is mobile or not
                  if (!isMobile) {
                    // If not mobile then check category children available or not
                    if (category?.childrens) {
                      // If available then set the hover category and show children sub categories
                      setHoveredCategory(category.id);
                    } else {
                      // If not available then set null to all hover categories
                      setHoveredCategory(null);
                      setHoveredSubCategory(null);
                      setHoveredThirdLevel(null);
                    }
                  }
                }}
                onClick={
                  category?.childrens
                    ? () => handleCategoryClick(category.id)
                    : undefined
                }
              >
                <Link href={category.link}>
                  <span>{category.title}</span>
                </Link>
                {category.childrens && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </div>
            ))}
          </div>

          {/* Sub Categories */}
          {(hoveredCategory || (isMobile && activeLevel > 0)) && (
            <div
              className={`py-2 border-r ${isMobile ? "w-full" : "w-64"} ${
                isMobile && activeLevel !== 1 ? "hidden" : ""
              }`}
            >
              {isMobile && (
                <div
                  onClick={handleBackClick}
                  className="flex items-center px-4 py-2 cursor-pointer text-primary"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </div>
              )}
              {categories
                .find((cat) => cat.id === hoveredCategory)
                ?.childrens?.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    className={`flex items-center justify-between px-4 py-2 hover:bg-orange-50 cursor-pointer ${
                      hoveredSubCategory === subCategory.id
                        ? "text-orange-500"
                        : ""
                    }`}
                    onMouseEnter={() => {
                      // First check for it is mobile or not
                      if (!isMobile) {
                        // If not mobile then check category children available or not
                        if (subCategory?.childrens) {
                          // If available then set the hover category and show children sub categories
                          setHoveredSubCategory(subCategory.id);
                        } else {
                          // If not available then set null to all hover categories
                          setHoveredSubCategory(null);
                          setHoveredThirdLevel(null);
                        }
                      }
                    }}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                  >
                    <Link href={subCategory.link}>{subCategory.title}</Link>
                    {subCategory.childrens && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Third Level Categories */}
          {(hoveredSubCategory || (isMobile && activeLevel > 1)) && (
            <div
              className={`py-2 ${isMobile ? "w-full" : "w-64"} ${
                isMobile && activeLevel !== 2 ? "hidden" : ""
              }`}
            >
              {isMobile && (
                <div
                  onClick={handleBackClick}
                  className="flex items-center px-4 py-2 cursor-pointer text-primary"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </div>
              )}
              {categories
                .find((cat) => cat.id === hoveredCategory)
                ?.childrens?.find((subCat) => subCat.id === hoveredSubCategory)
                ?.childrens?.map((thirdLevel) => (
                  <div
                    key={thirdLevel.id}
                    className={`flex items-center justify-between px-4 py-2 hover:bg-orange-50 cursor-pointer ${
                      hoveredThirdLevel === thirdLevel.id
                        ? "text-orange-500"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      !isMobile && setHoveredThirdLevel(thirdLevel.id)
                    }
                    onClick={() => handleThirdLevelClick(thirdLevel.id)}
                  >
                    <Link href={thirdLevel.link}>{thirdLevel.title}</Link>
                    {thirdLevel.childrens && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Fourth Level Categories */}
          {(hoveredThirdLevel || (isMobile && activeLevel > 2)) && (
            <div
              className={`py-2 ${isMobile ? "w-full" : "w-64"} ${
                isMobile && activeLevel !== 3 ? "hidden" : ""
              }`}
              onMouseLeave={() => !isMobile && setHoveredThirdLevel(null)}
            >
              {isMobile && (
                <div
                  onClick={handleBackClick}
                  className="flex items-center px-4 py-2 cursor-pointer text-primary"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </div>
              )}
              {categories
                .find((cat) => cat.id === hoveredCategory)
                ?.childrens?.find((subCat) => subCat.id === hoveredSubCategory)
                ?.childrens?.find(
                  (thirdCat) => thirdCat.id === hoveredThirdLevel
                )
                ?.childrens?.map((fourthLevel) => (
                  <Link
                    key={fourthLevel.id}
                    href={fourthLevel.link}
                    className="flex items-center justify-between px-4 py-2 hover:bg-orange-50"
                  >
                    {fourthLevel.title}
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
