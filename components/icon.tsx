import MorningSvg from '@/assets/icons/morning.svg';
import AfternoonSvg from '@/assets/icons/afternoon.svg';
import EveningSvg from '@/assets/icons/evening.svg';
import NightSvg from '@/assets/icons/night.svg';
import ActiveRadioSvg from '@/assets/icons/active-radio.svg';
import InactiveRadioSvg from '@/assets/icons/inactive-radio.svg';
import { SvgProps } from 'react-native-svg';
import React from 'react';

const Icons = {
    MorningIcon: (props: SvgProps) => <MorningSvg {...props} />,
    AfternoonIcon: (props: SvgProps) => <AfternoonSvg {...props} />,
    EveningIcon: (props: SvgProps) => <EveningSvg {...props} />,
    NightIcon: (props: SvgProps) => <NightSvg {...props} />,
    ActiveRadioIcon: (props: SvgProps) => <ActiveRadioSvg {...props} />,
    InactiveRadioIcon: (props: SvgProps) => <InactiveRadioSvg {...props} />,
};

export { Icons };