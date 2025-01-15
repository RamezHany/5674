import { IconType } from 'react-icons';

import {
    HiChevronUp,
    HiChevronDown,
    HiChevronRight,
    HiChevronLeft,
    HiArrowUpRight,
    HiOutlineArrowPath,
    HiCheck,
    HiMiniQuestionMarkCircle,
    HiMiniXMark,
    HiOutlineLink,
    HiExclamationTriangle,
    HiInformationCircle,
    HiExclamationCircle,
    HiCheckCircle,
    HiMiniGlobeAsiaAustralia,
    HiEnvelope,
    HiCalendarDays,
} from "react-icons/hi2";

import {
    PiHouseDuotone,
    PiUserCircleDuotone,
    PiGridFourDuotone,
    PiBookBookmarkDuotone,
    PiImageDuotone,
    PiFolderDuotone
} from "react-icons/pi";

import {
    FaDiscord,
    FaGithub,
    FaLinkedin,
    FaXTwitter,
    FaFacebookF
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
    chevronUp: HiChevronUp,
    chevronDown: HiChevronDown,
    chevronRight: HiChevronRight,
    chevronLeft: HiChevronLeft,
    refresh: HiOutlineArrowPath,
    arrowUpRight: HiArrowUpRight,
    check: HiCheck,
    helpCircle: HiMiniQuestionMarkCircle,
    infoCircle: HiInformationCircle,
    warningTriangle: HiExclamationTriangle,
    errorCircle: HiExclamationCircle,
    checkCircle: HiCheckCircle,
    close: HiMiniXMark,
    link: HiOutlineLink,
    globe: HiMiniGlobeAsiaAustralia,
    email: HiEnvelope,
    calendar: HiCalendarDays,
    folder: PiFolderDuotone,
    home: PiHouseDuotone,
    user: PiUserCircleDuotone,
    grid: PiGridFourDuotone,
    book: PiBookBookmarkDuotone,
    image: PiImageDuotone,
    discord: FaDiscord,
    github: FaGithub,
    linkedin: FaLinkedin,
    x: FaXTwitter,
    'facebook-f': FaFacebookF
};