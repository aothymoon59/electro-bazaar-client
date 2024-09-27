/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Modal } from "antd";
import { ReactNode } from "react";

export type EBModalProps = {
  title?: string;
  isModalOpen: boolean;
  setIsModalOpen?: any;
  children?: ReactNode;
  isCentered?: boolean;
  modalWidth?: number;
  modalData?: any;
};

const EBModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  children,
  isCentered,
  modalWidth,
}: EBModalProps) => {
  return (
    <div>
      <Modal
        title={false}
        centered={isCentered || false}
        footer={null}
        maskClosable={false}
        open={isModalOpen}
        closable={true}
        onCancel={() => {
          if (isModalOpen) {
            if (setIsModalOpen) {
              setIsModalOpen(false);
            }
          }
        }}
        width={modalWidth || 545}
      >
        <Divider orientation="left" dashed className="border-primary-main">
          {title}
        </Divider>
        <div className="">{children}</div>
      </Modal>
    </div>
  );
};

export default EBModal;
