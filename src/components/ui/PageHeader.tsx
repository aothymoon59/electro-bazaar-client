/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

// Reusable PageHeader component
const PageHeader = ({ title, breadcrumbs = [], actions }: any) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {/* Title */}
          <h5 className="font-bold text-xl leading-[30px] text-primary-main">
            {title}
          </h5>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 sm:gap-2 pt-3">
            {breadcrumbs.map((breadcrumb: any, index: number) => (
              <React.Fragment key={index}>
                {breadcrumb.link ? (
                  <Link
                    to={breadcrumb.link}
                    className="flex items-center gap-2 font-bold text-primary-main"
                  >
                    {breadcrumb.icon && breadcrumb.icon}
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <div
                    className={`text-${
                      breadcrumb.isCurrent ? "slate-400" : "primary-main"
                    }`}
                  >
                    {breadcrumb.label}
                  </div>
                )}
                {index < breadcrumbs.length - 1 && (
                  <IoIosArrowForward className="mx-1 sm:mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {actions}
      </div>
      <hr className="border-primary-main my-[23px]" />
    </div>
  );
};

export default PageHeader;
