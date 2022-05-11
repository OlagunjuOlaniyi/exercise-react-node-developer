import { Modal } from 'antd';
import './styles/repo-details.scss';

interface Props {
  data: { updatedAt: string; author: string; description: string };
  visible: boolean;
  handleCancel: () => void;
}

function RepoDetails(props: Props) {
  const { data, visible, handleCancel } = props;
  return (
    <Modal
      title="Repository"
      visible={visible}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="content">
        <div>
          <h5>{data.updatedAt}</h5>
          <h6>Recent Commit Date</h6>
        </div>
        <div>
          <h5>{data.author}</h5>
          <h6>Author</h6>
        </div>
        <div>
          <h5>{data.description}</h5>
          <h6>Message</h6>
        </div>
      </div>
    </Modal>
  );
}

export default RepoDetails;
