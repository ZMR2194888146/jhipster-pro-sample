import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import { IAnnouncement, Announcement } from '@/shared/model/system/announcement.model';
import AnnouncementService from './announcement.service';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { UPLOAD_IMAGE_URL } from '@/constants';
import { ReceiverType } from '@/shared/model/enumerations/receiver-type.model';

const validations: any = {
  announcement: {
    id: {},
    titile: {},
    content: {},
    startTime: {},
    endTime: {},
    senderId: {},
    priority: {},
    category: {},
    receiverType: {},
    sendStatus: {},
    sendTime: {},
    cancelTime: {},
    businessType: {},
    businessId: {},
    openType: {},
    openPage: {},
    receiverIds: {},
    summary: {},
  },
};

@Component({
  validations,
  components: {
    'jhi-quill-editor': quillEditor,
  },
})
export default class AnnouncementUpdateTemplate extends Vue {
  @Inject('announcementService') private announcementService: () => AnnouncementService;
  public announcement: IAnnouncement = new Announcement();
  public isSaving = false;
  public loading = false;
  public formJsonData = {
    list: [],
    config: {
      layout: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      hideRequiredMark: false,
      customStyle: '',
    },
  };
  public dataFormContent = [];
  public announcementId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.announcementId) {
        vm.retrieveAnnouncement(to.params.announcementId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.announcement.id) {
      this.announcementService()
        .update(this.announcement)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.announcement.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.announcementService()
        .create(this.announcement)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.announcement.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  get receiveComponentProps() {
    const result: any = {
      show: false,
      props: {
        mode: 'multiple',
        valueField: 'id',
        labelField: '',
      },
      optionProps: {
        value: 'id',
        label: '',
      },
    };
    switch (this.announcement.receiverType) {
      case ReceiverType.ALL:
        result.show = false;
        result.selectListName = '';
        break;
      case ReceiverType.AUTHORITY:
        result.show = true;
        result.selectListName = 'jhi-authority-compact';
        result.props.labelField = 'name';
        result.optionProps.label = 'name';
        break;
      case ReceiverType.DEPARTMENT:
        result.show = true;
        result.selectListName = 'jhi-department-compact';
        result.props.labelField = 'name';
        result.optionProps.label = 'name';
        break;
      case ReceiverType.USER:
        result.show = true;
        result.selectListName = 'jhi-user-compact';
        result.props.labelField = 'firstName';
        result.optionProps.label = 'firstName';
        break;
      case ReceiverType.POSITION:
        result.show = true;
        result.selectListName = 'jhi-position-compact';
        result.props.labelField = 'name';
        result.optionProps.label = 'name';
        break;
      default:
        result.show = false;
        result.selectListName = '';
    }
    return result;
  }

  public retrieveAnnouncement(announcementId): void {
    this.announcementService()
      .find(announcementId)
      .then(res => {
        this.announcement = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  // ??????????????????????????????????????????????????????????????????????????????????????????
  public toTreeNode(items: any, valueFieldName: string, labelFieldName: string, currentId?: any, disabledParent: boolean = false) {
    const nzTreeNode = [];
    if (!items) {
      return nzTreeNode;
    }
    items.forEach(item => {
      let disabledChildren = false;
      const option = {
        value: item[valueFieldName],
        label: item[labelFieldName],
        disabled: disabledParent, // ????????????????????????????????????????????????????????????
        children: undefined,
      };
      if (item[valueFieldName] === currentId) {
        option.disabled = true;
        disabledChildren = true;
      }
      if (item.children && item.children.length > 0) {
        option.children = this.toTreeNode(item.children, valueFieldName, labelFieldName, currentId, disabledChildren);
      }
      nzTreeNode.push(option);
    });
    console.log(nzTreeNode);
    return nzTreeNode;
  }
}
