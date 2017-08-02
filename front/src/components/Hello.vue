<template>
  <div class="hello">
    <h2>Gerenciamento de usuários</h2>

    <table>
      <thead>
        <tr>
          <th>nome</th>
          <th>email</th>
          <th>senha</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.data">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <a href="" @click.prevent="remove(user._id)">x</a>
            -
            <a href="" @click.prevent="toUpdate(user)">update</a>
          </td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="save()">
      <input type="text" placeholder="Nome" v-model="toSave.name">
      <input type="email" placeholder="Email" v-model="toSave.email">
      <input type="text" placeholder="Senha" v-model="toSave.password">
      <input type="submit" value="+">
    </form>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      users: {data:[]},
      toSave: {},
      updateStatus: false
    }
  },
  methods: {
    save() {
      if (this.updateStatus) {
        this.update();
      } else {
        this.create();
      }
    },
    getList() {
      window.axios.get('/api/users')
        .then((res) => {
          this.users = res.data;
        })
    },
    remove(id) {
      window.axios.delete('/api/users/' + id)
        .then(() => {
          this.getList();
        })
    },
    create() {
      window.axios.post('/api/users', this.toSave).then(() => {
        this.toSave = {};
        this.getList();
      });
    },
    update() {
      window.axios.put('/api/users/' + this.toSave._id, this.toSave).then(() => {
        this.toSave = {};
        this.updateStatus = false;
        this.getList();
      });
    },
    toUpdate(user) {
      this.updateStatus = user._id;
      this.toSave = user;
    }
  },
  mounted () {
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
