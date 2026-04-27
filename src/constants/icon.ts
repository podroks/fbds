import AddIcon from '@/components/subatoms/icon/variants/AddIcon.vue';
import ArrowRightIcon from '@/components/subatoms/icon/variants/ArrowRightIcon.vue';
import CaretDownIcon from '@/components/subatoms/icon/variants/CaretDownIcon.vue';
import CaretUpIcon from '@/components/subatoms/icon/variants/CaretUpIcon.vue';
import CheckIcon from '@/components/subatoms/icon/variants/CheckIcon.vue';
import ChevronRightIcon from '@/components/subatoms/icon/variants/ChevronRightIcon.vue';
import CircleDotIcon from '@/components/subatoms/icon/variants/CircleDotIcon.vue';
import CircleIcon from '@/components/subatoms/icon/variants/CircleIcon.vue';
import CloseIcon from '@/components/subatoms/icon/variants/CloseIcon.vue';
import CopyIcon from '@/components/subatoms/icon/variants/CopyIcon.vue';
import DeleteIcon from '@/components/subatoms/icon/variants/DeleteIcon.vue';
import DocumentIcon from '@/components/subatoms/icon/variants/DocumentIcon.vue';
import DownloadIcon from '@/components/subatoms/icon/variants/DownloadIcon.vue';
import FilterIcon from '@/components/subatoms/icon/variants/FilterIcon.vue';
import FilterListIcon from '@/components/subatoms/icon/variants/FilterListIcon.vue';
import GridViewIcon from '@/components/subatoms/icon/variants/GridViewIcon.vue';
import HelpIcon from '@/components/subatoms/icon/variants/HelpIcon.vue';
import InfoIcon from '@/components/subatoms/icon/variants/InfoIcon.vue';
import LinkIcon from '@/components/subatoms/icon/variants/LinkIcon.vue';
import ListViewIcon from '@/components/subatoms/icon/variants/ListViewIcon.vue';
import LockIcon from '@/components/subatoms/icon/variants/LockIcon.vue';
import MailIcon from '@/components/subatoms/icon/variants/MailIcon.vue';
import MoreHorizIcon from '@/components/subatoms/icon/variants/MoreHorizIcon.vue';
import NotificationsIcon from '@/components/subatoms/icon/variants/NotificationsIcon.vue';
import RemoveIcon from '@/components/subatoms/icon/variants/RemoveIcon.vue';
import SearchIcon from '@/components/subatoms/icon/variants/SearchIcon.vue';
import SendIcon from '@/components/subatoms/icon/variants/SendIcon.vue';
import SettingsIcon from '@/components/subatoms/icon/variants/SettingsIcon.vue';
import ShieldIcon from '@/components/subatoms/icon/variants/ShieldIcon.vue';
import SpinnerIcon from '@/components/subatoms/icon/variants/SpinnerIcon.vue';
import TagIcon from '@/components/subatoms/icon/variants/TagIcon.vue';
import UploadIcon from '@/components/subatoms/icon/variants/UploadIcon.vue';
import UserIcon from '@/components/subatoms/icon/variants/UserIcon.vue';
import UsersIcon from '@/components/subatoms/icon/variants/UsersIcon.vue';
import VisibilityIcon from '@/components/subatoms/icon/variants/VisibilityIcon.vue';
import VisibilityOffIcon from '@/components/subatoms/icon/variants/VisibilityOffIcon.vue';

export const Icon = {
  Add: AddIcon,
  ArrowRight: ArrowRightIcon,
  CaretDown: CaretDownIcon,
  CaretUp: CaretUpIcon,
  ChevronRight: ChevronRightIcon,
  Check: CheckIcon,
  Circle: CircleIcon,
  CircleDot: CircleDotIcon,
  Close: CloseIcon,
  Copy: CopyIcon,
  Delete: DeleteIcon,
  Document: DocumentIcon,
  Download: DownloadIcon,
  Filter: FilterIcon,
  FilterList: FilterListIcon,
  GridView: GridViewIcon,
  Help: HelpIcon,
  Info: InfoIcon,
  Link: LinkIcon,
  ListView: ListViewIcon,
  Lock: LockIcon,
  Mail: MailIcon,
  MoreHoriz: MoreHorizIcon,
  Notifications: NotificationsIcon,
  Remove: RemoveIcon,
  Search: SearchIcon,
  Send: SendIcon,
  Settings: SettingsIcon,
  Shield: ShieldIcon,
  Spinner: SpinnerIcon,
  Tag: TagIcon,
  Upload: UploadIcon,
  User: UserIcon,
  Users: UsersIcon,
  Visibility: VisibilityIcon,
  VisibilityOff: VisibilityOffIcon,
} as const;

export type Icon = (typeof Icon)[keyof typeof Icon];
