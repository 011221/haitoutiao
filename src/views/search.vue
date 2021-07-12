<template>
  <div class="search-container">

    <form action="/">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
      />
    </form>

    <!-- 历史记录 -->
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div >

        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <van-icon

        name="delete"

      />
    </van-cell>
    <van-cell
      title="111"
    >
      <van-icon
        name="close"
      />
    </van-cell>
  </div>
    <!-- /历史记录 -->
  </div>
</template>

<style  lang="scss">

  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
