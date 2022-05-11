import { useState } from 'react';

function ModalHandler() {
  const [visible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return { visible, showModal, handleCancel };
}

export default ModalHandler;
