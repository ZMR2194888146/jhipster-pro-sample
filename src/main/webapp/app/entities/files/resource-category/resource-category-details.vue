<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="resourceCategory">
        <h2 class="jh-entity-heading">
          <span v-text="$t('lwjsApp.filesResourceCategory.detail.title')">ResourceCategory</span> {{ resourceCategory.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('lwjsApp.filesResourceCategory.id')">ID</span>
          </dt>
          <dd>
            <span>{{ resourceCategory.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.filesResourceCategory.title')">Title</span>
          </dt>
          <dd>
            <span>{{ resourceCategory.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.filesResourceCategory.code')">Code</span>
          </dt>
          <dd>
            <span>{{ resourceCategory.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.filesResourceCategory.sort')">Sort</span>
          </dt>
          <dd>
            <span>{{ resourceCategory.sort }}</span>
          </dd>
          <dt>
            <span v-text="$t('lwjsApp.filesResourceCategory.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="resourceCategory.parentId">
              <router-link :to="{ name: 'ResourceCategoryView', params: { resourceCategoryId: resourceCategory.parentId } }">{{
                resourceCategory.parentTitle
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="resourceCategory.id"
          :to="{ name: 'ResourceCategoryEdit', params: { resourceCategoryId: resourceCategory.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./resource-category-details.component.ts"></script>
