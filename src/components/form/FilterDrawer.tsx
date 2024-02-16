/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Drawer, Space } from "antd";

const FilterDrawer = ({ setQuery, query }: any) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    // setQuery({});
  };

  const handlePreventWheel = (e: any) => {
    e.target.addEventListener(
      "wheel",
      function (e: any) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  return (
    <>
      <Space>
        <button
          className="primary-main-btn hover:bg-opacity-80 transition-all duration-200 ease-in-out"
          onClick={showDrawer}
        >
          Filter
        </button>
      </Space>
      <Drawer
        title="Filters"
        placement={"right"}
        onClose={onClose}
        open={open}
        key={"right"}
      >
        <div>
          {/* price range  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Price Range</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                min={0}
                type="number"
                placeholder="min price"
                className="input input-bordered w-full"
                onChange={(e: any) =>
                  setQuery({ ...query, minPrice: e.target.value })
                }
                onFocus={(e) => handlePreventWheel(e)}
              />
              <input
                min={0}
                type="number"
                placeholder="max price"
                className="input input-bordered w-full"
                onChange={(e: any) =>
                  setQuery({ ...query, maxPrice: e.target.value })
                }
                onFocus={(e) => handlePreventWheel(e)}
              />
            </div>
          </div>
          {/* release date  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Release Date</span>
            </label>
            <input
              type="date"
              onChange={(e: any) =>
                setQuery({ ...query, releaseDate: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          {/* Brand  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Brand*</span>
            </label>
            <input
              type="text"
              onChange={(e: any) =>
                setQuery({ ...query, brand: e.target.value })
              }
              placeholder="by brand name"
              className="input input-bordered w-full"
            />
          </div>
          {/* Camera Resolution  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Camera Resolution</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              onChange={(e: any) =>
                setQuery({
                  ...query,
                  cameraResolution: parseInt(e.target.value),
                })
              }
              placeholder="by camera resolution"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div>
          {/* Storage Capacity  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Storage Capacity</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              onChange={(e: any) =>
                setQuery({ ...query, storage: e.target.value })
              }
              placeholder="by storage"
              onFocus={(e) => handlePreventWheel(e)}
            />
          </div>
          {/* Model Number  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Model Number</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(e: any) =>
                setQuery({ ...query, modelNumber: e.target.value })
              }
              placeholder="by Model Number"
            />
          </div>
          {/* Category  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(e: any) =>
                setQuery({ ...query, category: e.target.value })
              }
              placeholder="by Category"
            />
          </div>
          {/* os */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Operating System</span>
            </label>
            <div className="flex justify-start items-center gap-2">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    operatingSystem: e.target.checked ? "IOS" : "",
                  })
                }
                className=""
                type="checkbox"
                id="iOS"
              />
              <label className="mr-auto" htmlFor="iOS">
                IOS
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    operatingSystem: e.target.checked ? "Android" : "",
                  })
                }
                className=""
                type="checkbox"
                id="Android"
              />
              <label className="mr-auto" htmlFor="Android">
                Android
              </label>
            </div>
            <div className="flex justify-start items-center gap-2 ">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    operatingSystem: e.target.checked ? "Windows" : "",
                  })
                }
                className=""
                type="checkbox"
                id="Windows"
                name="Windows"
              />
              <label className="mr-auto" htmlFor="Windows">
                Windows
              </label>
            </div>
            <div className="flex justify-start items-center gap-2 ">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    operatingSystem: e.target.checked ? "Mac" : "",
                  })
                }
                className=""
                type="checkbox"
                id="Mac"
                name="Mac"
              />
              <label className="mr-auto" htmlFor="Mac">
                Mac
              </label>
            </div>
          </div>
          {/* connectivity */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Connectivity</span>
            </label>
            <div className="flex justify-start items-center gap-2">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    connectivity: e.target.checked ? "Bluetooth" : "",
                  })
                }
                className=""
                type="checkbox"
                id="Bluetooth"
              />
              <label className="mr-auto" htmlFor="Bluetooth">
                Bluetooth
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    connectivity: e.target.checked ? "Wifi" : "",
                  })
                }
                className=""
                type="checkbox"
                id="Wifi"
              />
              <label className="mr-auto" htmlFor="Wifi">
                Wifi
              </label>
            </div>
            <div className="flex justify-start items-center gap-2 ">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    connectivity: e.target.checked ? "USB" : "",
                  })
                }
                className=""
                type="checkbox"
                id="USB"
              />
              <label className="mr-auto" htmlFor="USB">
                USB
              </label>
            </div>
          </div>
          {/* Power Source */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Power Source</span>
            </label>
            <div className="flex justify-start items-center gap-2">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    powerSource: e.target.checked ? "battery" : "",
                  })
                }
                className=""
                type="checkbox"
                id="battery"
              />
              <label className="mr-auto" htmlFor="battery">
                battery
              </label>
            </div>
            <div className="flex justify-start items-center gap-2 ">
              <input
                onChange={(e: any) =>
                  setQuery({
                    ...query,
                    powerSource: e.target.checked ? "plugin" : "",
                  })
                }
                className=""
                type="checkbox"
                id="plugin"
              />
              <label className="mr-auto" htmlFor="plugin">
                plugin
              </label>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
