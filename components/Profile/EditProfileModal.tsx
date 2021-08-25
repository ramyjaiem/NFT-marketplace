import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Input, Button, Row, Col } from 'antd';
import {
  Modal
} from "react-bootstrap";
import PictureUpload from './PictureUpload';
import { useAuth } from '../../utils/auth';
import { useWallet } from '../../utils/wallet';
import { uploadSingle } from '../../utils/upload';
const { TextArea } = Input;

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface ModalProps {
  isVisible: boolean;
  onCancel: () => void;
  setModal: Dispatcher<boolean>;
}

const FormWrapper = styled.div`
  padding: 30px;
`;

const AntModal = styled(Modal)`
  padding: 0;

  p {
    font-weight: 500;
    color: ${(props) => props.theme.colors.white};
    font-size: 26px;
  }

  & .ant-modal-body {
    padding: 0;
    background: ${(props) => props.theme.colors.black};
    height: fit-content;
  }

  label {
    color: ${(props) => props.theme.colors.white};
  }

  & .ant-input {
    background: #393d42;
    border: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
    border-radius: 20px;
  }
`;

export default function EditProfileModal({ isVisible, onCancel }: ModalProps) {
  const { userWalletId, userData, setUserData, isAuthenticated } = useAuth();
  const [pfpImg, setPfpImg] = useState<{ picUrl: any; pic: any }>();
  const [bannerImg, setBannerImg] = useState<{ picUrl: any; pic: any }>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { wallet, connect, connected } = useWallet();

  useEffect(() => {
    if (isAuthenticated && !connected) {
      connect();
    }
  }, [isAuthenticated, connected]);

  useEffect(() => {
    if (userData?.profilePicture) {
      setPfpImg({ picUrl: userData?.profilePicture, pic: null });
    }

    if (userData?.banner) {
      setBannerImg({ picUrl: userData?.banner, pic: null });
    }
  }, [userData?.profilePicture, userData?.banner]);

  const handleSubmit = async (values: {
    twitter: string;
    instagram: string;
    description: string;
    facebook: string;
    discord: string;
  }) => {
    if (!wallet) {
      alert('please connect wallet');
    } else {
      setLoading(true);
      let profilePicture = userData?.profilePicture;
      let banner = userData?.banner;

      if (pfpImg?.pic) {
        profilePicture = await uploadSingle(pfpImg.pic, 'profile/');
      }

      if (bannerImg?.pic) {
        banner = await uploadSingle(bannerImg.pic, 'banner/');
      }
      const signDate = new Date().toISOString();
      const userUpdates = {
        social: {
          instagram: values.instagram,
          twitter: values.twitter,
          facebook: values.facebook,
          discord: values.discord,
        },
        description: values.description,
        banner,
        profilePicture,
        signDate,
      };

      const data = JSON.stringify({
        input: {
          filter: { walletId: { eq: userWalletId } },
          set: userUpdates,
        },
        signDate,
      });
      const encodedData = new TextEncoder().encode(data);
      const { signature, publicKey } = await wallet.sign(encodedData, 'hex');

      const addConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .post(
          '/api/updateUserData',
          JSON.stringify({ signature, publicKey: publicKey.toString(), encodedData }),
          addConfig,
        )
        .catch(function (error) {
          console.log(error.response.data); // this is the part you need that catches 400 request
        });
      setLoading(false);
      setUserData({ ...userData, ...userUpdates });
      setPfpImg({ ...pfpImg, pic: null });
      setBannerImg({ ...bannerImg, pic: null });
      onCancel();
    }
  };

  return (
    <Modal className='profile-modal' show={isVisible} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PictureUpload
          pfpImgObj={pfpImg}
          setPfpImgObj={setPfpImg}
          bannerImgObj={bannerImg}
          setBannerImgObj={setBannerImg}
        />
        <Form
          style={{ marginTop: 100 }}
          initialValues={{
            facebook: userData?.social?.facebook,
            discord: userData?.social?.discord,
            description: userData?.description,
            twitter: userData?.social?.twitter,
            instagram: userData?.social?.instagram,
          }}
          hideRequiredMark
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Bio" name="description" >
            <TextArea placeholder="say something about yourself" rows={5} />
          </Form.Item>
          <Row gutter={[12, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Twitter" name="twitter">
                <Input placeholder="@me" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Instagram" name="instagram">
                <Input placeholder="@me" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Discord" name="discord">
                <Input placeholder="@me" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Facebook" name="facebook">
                <Input placeholder="@me" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col offset={12}>
              <Button loading={loading} htmlType="submit" type="primary">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>

      </Modal.Body>
    </Modal>

  );
}
