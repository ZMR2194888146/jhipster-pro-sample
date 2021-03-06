import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import { IUReportFile, UReportFile } from '@/shared/model/report/u-report-file.model';
import UReportFileService from './u-report-file.service';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { UPLOAD_IMAGE_URL } from '@/constants';

const validations: any = {
  uReportFile: {
    id: {},
    name: {},
    content: {},
    createAt: {},
    updateAt: {},
  },
};

@Component({
  validations,
  components: {
    'jhi-quill-editor': quillEditor,
  },
})
export default class UReportFileUpdateTemplate extends Vue {
  @Inject('uReportFileService') private uReportFileService: () => UReportFileService;
  public uReportFile: IUReportFile = new UReportFile();
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
  public uReportFileId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.uReportFileId) {
        vm.retrieveUReportFile(to.params.uReportFileId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.uReportFile.id) {
      this.uReportFileService()
        .update(this.uReportFile)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.reportUReportFile.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.uReportFileService()
        .create(this.uReportFile)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.reportUReportFile.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveUReportFile(uReportFileId): void {
    this.uReportFileService()
      .find(uReportFileId)
      .then(res => {
        this.uReportFile = res;
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
