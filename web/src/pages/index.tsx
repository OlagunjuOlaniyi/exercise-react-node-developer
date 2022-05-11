/* eslint-disable @typescript-eslint/naming-convention */
import { Table } from 'antd';
import { useState } from 'react';
import RepoDetails from './RepoDetails';
import detailsModalHandler from './core/ModalHandler';
import repos from './core/fetch-repo';

interface IRepos {
  id: number;
  name: string;
  description: string;
  language: string;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: { login: string };
}
const INDEX = () => {
  const { state } = repos();

  const data: any[] = [];
  if (state.success) {
    state.payload.map((i: IRepos) => {
      return data.push({
        key: i.id,
        name: i.name,
        description: i.description,
        language: i.language,
        forksCount: i.forks_count,
        createdAt: i.created_at,
        updatedAt: i.updated_at,
        author: i.owner.login,
      });
    });
  }

  const [language, setLanguage] = useState('');
  const handleLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const [rowData, setRowData] = useState<any>({});
  const { visible, showModal, handleCancel } = detailsModalHandler();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      render: (value: string, record: any) => {
        return (
          <span
            className="text-info"
            onClick={() => {
              setRowData(record);
              showModal();
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      render: (value: string) => (
        <button onClick={() => handleLanguage(value)}>{value}</button>
      ),
    },
    {
      title: 'Forks Count',
      dataIndex: 'forksCount',
      key: 'forksCount',
    },
  ];

  const payload = data.sort((a, b) => {
    return (new Date(a.created_at) as any) - (new Date(b.created_at) as any);
  });

  const filteredPayload = payload.filter((p) => p.language === language);
  const src = language ? filteredPayload : payload;

  return (
    <>
      <div className="container">
        <h1>React Node Excercise</h1>
        <Table columns={columns} dataSource={src} />
      </div>
      <RepoDetails
        data={rowData}
        visible={visible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default INDEX;
