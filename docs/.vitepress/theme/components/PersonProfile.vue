<template>
  <div class="person-profile" h-300px>
    <div w-35 h-35 position-absolute rounded-full bg="#f28b7088" top="-55px" left="-40px"></div>
    <div w-30 h-30 position-absolute rounded-full bg="#59a14588" bottom="35px" right="-70px"></div>
    <div w-20 h-20 position-absolute rounded-full bg="#f3be6388" bottom="15px" left="30px"></div>
    <img draggable="false" class="avatar" src="/me.png">
    <div class="shield" bottom-0 p-4 flex>
      <div>
        <div class="name" font-800 text-lg>Peter Roe</div>
        <div class="name" text-sm>hi@peterroe.me</div>
      </div>
      <div text-right flex-1 leading="50px">
        <a href="https://github.com/peterroe"><LogosGithubIcon mr-1 /></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.person-profile {
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
  /* background-color: #edf7ff; */
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}
.dot {
  border-radius: 50%;
  background-color: #64bdf8;
  position: absolute;
}
.shield {
  position: absolute;
  height: 80px;
  border-radius: 1rem;
  width: 100%;
  backdrop-filter: blur(40px); 
}
.name {
  font-family: 'MonaspaceRadon';
}
.avatar {
  position: absolute;
  top: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
