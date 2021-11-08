<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="department">
        <h2 class="jh-entity-heading">
          <span v-text="$t('lwjsApp.settingsDepartment.detail.title')">Department</span> {{ department.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.id')">ID</span>
          </dt>
          <dd>
            <span>{{ department.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.name')">Name</span>
          </dt>
          <dd>
            <span>{{ department.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.code')">Code</span>
          </dt>
          <dd>
            <span>{{ department.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.address')">Address</span>
          </dt>
          <dd>
            <span>{{ department.address }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.phoneNum')">Phone Num</span>
          </dt>
          <dd>
            <span>{{ department.phoneNum }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.logo')">Logo</span>
          </dt>
          <dd>
            <span>{{ department.logo }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.contact')">Contact</span>
          </dt>
          <dd>
            <span>{{ department.contact }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.createUserId')">Create User Id</span>
          </dt>
          <dd>
            <span>{{ department.createUserId }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.createTime')">Create Time</span>
          </dt>
          <dd>
            <span v-if="department.createTime">{{ $d(Date.parse(department.createTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.authorities')">Authorities</span>
          </dt>
          <dd>
            <span v-for="(authorities, i) in department.authorities" :key="authorities.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'AuthorityView', params: { authorityId: authorities.id } }">{{ authorities.name }}</router-link>
            </span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.settingsDepartment.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="department.parentId">
              <router-link :to="{ name: 'DepartmentView', params: { departmentId: department.parentId } }">{{
                department.parentName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="department.id"
          :to="{ name: 'DepartmentEdit', params: { departmentId: department.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./department-details.component.ts"></script>
