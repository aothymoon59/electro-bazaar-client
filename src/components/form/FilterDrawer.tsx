/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Checkbox, Drawer, Input, Select, Space } from "antd";
import {
  connectivityOptions,
  operatingSystemOptions,
  powerSourceOptions,
  productCategoryOptions,
} from "../../constants/products";

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
              <Input
                min={0}
                type="number"
                placeholder="min price"
                onChange={(e: any) =>
                  setQuery({ ...query, minPrice: e.target.value })
                }
                onFocus={(e) => handlePreventWheel(e)}
              />
              <Input
                min={0}
                type="number"
                placeholder="max price"
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
            <Input
              type="date"
              onChange={(e: any) =>
                setQuery({ ...query, releaseDate: e.target.value })
              }
            />
          </div>
          {/* Brand  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Brand*</span>
            </label>
            <Input
              type="text"
              onChange={(e: any) =>
                setQuery({ ...query, brand: e.target.value })
              }
              placeholder="by brand name"
            />
          </div>
          {/* Camera Resolution  */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Camera Resolution</span>
            </label>
            <Input
              type="number"
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
            <Input
              type="number"
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
            <Input
              type="text"
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
            <Select
              placeholder="select category"
              onChange={(value: any) => setQuery({ ...query, category: value })}
              options={productCategoryOptions}
            />
          </div>
          {/* os */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Operating System</span>
            </label>
            {operatingSystemOptions.map((os) => (
              <Checkbox
                onChange={() =>
                  setQuery({ ...query, operatingSystem: os.value })
                }
              >
                {os?.label}
              </Checkbox>
            ))}
          </div>
          {/* connectivity */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Connectivity</span>
            </label>
            {connectivityOptions.map((item) => (
              <Checkbox
                onChange={() =>
                  setQuery({ ...query, connectivity: item.value })
                }
              >
                {item?.label}
              </Checkbox>
            ))}
          </div>
          {/* Power Source */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Power Source</span>
            </label>
            {powerSourceOptions.map((item) => (
              <Checkbox
                onChange={() => setQuery({ ...query, powerSource: item.value })}
              >
                {item?.label}
              </Checkbox>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
