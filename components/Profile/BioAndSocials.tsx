import styled from 'styled-components';
import { Grid, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';

const { useBreakpoint } = Grid;

const socialLinks: { imgSrc: string; username: string; key: string; link: string }[] = [
  {
    imgSrc: '/facebook.svg',
    username: '@NinjaClanGuy',
    key: 'facebook',
    link: 'https://www.facebook.com/',
  },
  {
    imgSrc: '/twtr_icon.svg',
    username: '@NinjaClanGuy',
    key: 'twitter',
    link: 'https://twitter.com/',
  },
  {
    imgSrc: '/ig_icon.svg',
    username: '@NinjaClanGuy',
    key: 'instagram',
    link: 'https://instagram.com/',
  },
  {
    imgSrc: '/socialLinkIcons/discord.svg',
    username: '@NinjaClanGuy',
    key: 'discord',
    link: 'https://discord.com/',
  },
];

const BioAndSocial = styled(Row)`
  margin-top: 30px;
  min-height: 330px;
  margin-right: -4% !important;
  padding: 30px;
  border: 1px solid #851cef;
  background-color: ${(props) => props.theme.colors.cardBG};
  border-radius: 4px;
`;

const Bio = styled.div`
  color: ${(props) => props.theme.colors.white};

  .title {
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const Socials = styled(Bio)`
  .social {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    div:nth-child(2) {
      margin-left: 16px;
    }
  }
`;

const EditButton = styled.div``;

interface BioAndSocialsProps {
  userData: {
    social: any;
    description: string;
  };
}

export default function BioAndSocials({ userData }: BioAndSocialsProps) {
  const screen = useBreakpoint();
  const [editModal, setEditModal] = useState(false);
  let url = '#';
  return (
    <>
      <div className="card bg-dark border-primary py-1 h-100 ">
      
        <div className="row no-gutters px-3">

          <div className="col-md-5">
            <div className="px-3" >
              <div className="descrip text-md-left">
                <p className="card-title fs-5 py-2 font-24">Description / Bio</p>
              </div>
              <p className="font-15">{userData?.description ?? ``}</p>
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-md-4">

            <div className="social-icons justify-content-md-end px-lg-5">
              <div className="">
                <p className="card-title fs-5 py-1 font-24">Social Media</p>
                <ul className="list-group">
                  {userData?.social
                    ? socialLinks.map(
                      (link, index) => (
                        link?.key === 'facebook'
                          ? (url = 'https://www.facebook.com/')
                          : link?.key === 'twitter'
                            ? (url = 'https://twitter.com/')
                            : link?.key === 'instagram'
                              ? (url = 'https://instagram.com/')
                              : link?.key === 'discord'
                                ? (url = 'https://discord.com/')
                                : '',
                        (
                          <li key={index} className="list-group-item">
                            <img src={link?.imgSrc} alt="social-link" /><a style={{ paddingLeft: 5 }} target="_blank" href={url + userData?.social[link.key]}>{userData?.social[link.key]}</a></li>
                        )
                      ),
                    )
                    : null}
                </ul>
              </div>
            </div>
          </div>
		    <div className="col-md-2"> <Button
              onClick={() => setEditModal(true)}
              style={{ background: '#1F2331', color: 'white' }}
              size="large"
              type="link"
              icon={<EditOutlined />}
            >
              Edit
            </Button></div>
        </div>
      </div>

      <EditProfileModal isVisible={editModal} setModal={setEditModal} onCancel={() => setEditModal(false)} />
    </>
  );
}
