import { useRef, useState, Dispatch, SetStateAction } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { CameraFilled } from '@ant-design/icons';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface pfpProps {
  isError: boolean;
  previewUrl: any;
}

const BannerWrapper = styled.div`
  position: relative;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  min-height: 200px;
  position: relative;
`;

const ProfilePictureWrapper = styled.div`
  position: absolute;
  top: 28%;
  left: 10%;
`;

const ProfilePicture = styled.div<pfpProps>`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  position: relative;
  border: ${(props) => (props.isError ? `2px solid red` : `2px solid white`)};
  background: ${(props) => (props.previewUrl ? `url(${props.previewUrl})` : `url('/profile.jpg')`)};
  background-size: contain;
  overflow: hidden;
`;

const UploadPfpTrigger = styled.input`
  display: none;
`;

const UploadBannerTrigger = styled.input`
  display: none;
`;

const UploadButton = styled.div`
  position: absolute;
  right: -10%;
  top: 50%;
`;

const beforePreview = (file: any) => {
  const isJpgOrPng = file?.type === 'image/jpeg' || file?.type === 'image/png';
  const isLt4M = file?.size / 1024 / 1024 < 4;

  return isJpgOrPng && isLt4M;
};

interface ImgObject {
  picUrl?: string | null;
  pic?: File | null;
}
interface PictureUploadProps {
  pfpImgObj: ImgObject;
  setPfpImgObj: Dispatcher<{ picUrl: any; pic: any }>;
  bannerImgObj: ImgObject;
  setBannerImgObj: Dispatcher<{ picUrl: any; pic: any }>;
}

export default function PictureUpload({ pfpImgObj, setPfpImgObj, bannerImgObj, setBannerImgObj }: PictureUploadProps) {
  const pfpRef = useRef(null);
  const bannerRef = useRef(null);
  const [, setPfpFile] = useState('');
  const [, setPfpPreviewUrl] = useState<any>();
  const [isPfpError, setIsPfpError] = useState(false);

  const [, setBannerFile] = useState('');
  const [, setBannerPreviewUrl] = useState<any>();
  const [, setIsBannerError] = useState(false);

  const handleImageChange = (e: any, setIsError: any, setFile: any, setPreviewUrl: any, setImgObj: any) => {
    e.preventDefault();
    setIsError(false);

    const reader = new FileReader();
    const file = e.target.files[0];

    const isValid = beforePreview(file);

    reader.onloadend = () => {
      setFile(file);
      setPreviewUrl(reader.result);
      setImgObj((img: any) => ({
        ...img,
        pic: file,
        picUrl: reader.result,
      }));
    };

    if (!file) {
      reader.abort();
    } else if (file && !isValid) {
      reader.abort();
      setIsError(true);
    } else {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <BannerWrapper>
        <BannerImg src={bannerImgObj?.picUrl ? `${bannerImgObj?.picUrl}` : `/banner.jpg`} alt="banner" />
        <Button
          onClick={() => bannerRef.current.click()}
          style={{ position: 'absolute', right: '2%', bottom: '4%' }}
          size="small"
          icon={<CameraFilled />}
        >
          Edit Banner
        </Button>
        <UploadBannerTrigger
          name="banner"
          ref={bannerRef}
          type="file"
          onChange={(e) => handleImageChange(e, setIsBannerError, setBannerFile, setBannerPreviewUrl, setBannerImgObj)}
        />
      </BannerWrapper>
      <ProfilePictureWrapper>
        <ProfilePicture previewUrl={pfpImgObj?.picUrl} isError={isPfpError} />
        <UploadButton>
          <Button
            onClick={() => pfpRef.current.click()}
            style={{ background: 'white' }}
            size="large"
            shape="circle"
            icon={<CameraFilled />}
          />
        </UploadButton>
        <UploadPfpTrigger
          name="profilePicture"
          ref={pfpRef}
          type="file"
          onChange={(e) => handleImageChange(e, setIsPfpError, setPfpFile, setPfpPreviewUrl, setPfpImgObj)}
        />
      </ProfilePictureWrapper>
    </div>
  );
}
