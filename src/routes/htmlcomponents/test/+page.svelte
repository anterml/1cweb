<div>
  <div class="main">
    <button>button</button>
  </div>
</div>

<style>
  @layer first, second;

  @layer first {
    .main button {
      color: #069;
    }
  }
  @layer second {
    .main button {
      color: greenyellow;
    }
  }
</style>