import { SvgIcon } from '@material-ui/core';
import React from 'react';

const ScienceIconRemove: React.FC = props => {
  return (
    <SvgIcon {...props}>
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M15.46 15.88L16.88 14.46L19 16.59L21.12 14.47L22.53 15.88L20.41 18L22.54 20.12L21.12 21.54L19 19.41L16.88 21.53L15.47 20.12L17.59 18L15.46 15.88M6 22C4.34 22 3 20.66 3 19C3 18.4 3.18 17.84 3.5 17.36L9 7.81V6C8.45 6 8 5.55 8 5V4C8 2.9 8.9 2 10 2H14C15.11 2 16 2.9 16 4V5C16 5.55 15.55 6 15 6V7.81L17.5 12.18C14.92 12.84 13 15.2 13 18C13 19.54 13.58 20.94 14.53 22H6Z" />
      </g>
    </SvgIcon>
  );
};

export default ScienceIconRemove;