import MorningSvg from '@/assets/icons/morning.svg';
import AfternoonSvg from '@/assets/icons/afternoon.svg';
import EveningSvg from '@/assets/icons/evening.svg';
import NightSvg from '@/assets/icons/night.svg';
import { SvgProps } from 'react-native-svg';
import React from 'react';

const Icon = {
    MorningIcon: (props: SvgProps) => <MorningSvg {...props} />,
    AfternoonIcon: (props: SvgProps) => <AfternoonSvg {...props} />,
    EveningIcon: (props: SvgProps) => <EveningSvg {...props} />,
    NightIcon: (props: SvgProps) => <NightSvg {...props} />
};

export { Icon };