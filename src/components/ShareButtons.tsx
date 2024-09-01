import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from 'react-share';
import '../styles/DreamPage.module.css';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => (
  <div className="share-buttons flex w-1/2 justify-around h-full">
    <FacebookShareButton url={url} hashtag="#YourHashtag">
      <FacebookIcon size={38} round />
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={38} round />
    </TwitterShareButton>
    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={38} round />
    </WhatsappShareButton>
    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={38} round />
    </LinkedinShareButton>
  </div>
);

export default ShareButtons;
