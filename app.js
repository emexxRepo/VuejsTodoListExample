
// When document is ready
window.addEventListener('load', function () {
    // yeni bir vue instance'ı oluşturuyoruz
    new Vue({
        el: '#app',
        name: 'TodoList',
        data: {

            //hedeflenen sekmeyi varsayılan olarak Genele eşitliyoruz

            targetTab:'General',

            // Kategoriyi alacağımız değişken
            activeList: '',

            // Görevi alacağımız değişken
            activeData: '',

            // Varsayılan olarak gelen yapılacaklar
            dataList: [
                {
                    Id:1,Title:'Do your homework',
                    Status:true,List:'Special'
                },

                {
                    Id:2,Title:'Learn VueJS',
                    Status:true,List:'General'
                },

                {
                    Id:3,Title:'Learn Smyfony',
                    Status:false,List:'Work'
                },

                {
                    Id:4,Title:'Learn English',
                    Status:false,List:'General'
                }

            ],

            // varsayılan olarak kategoriler
            lists: [
                {name: 'General'},
                {name: 'Work'},
                {name: 'Special'}
            ]
        },
        methods: {
            // kategoriye tıkladığımızda hedeflenen sekme yi eşitliyoruz
            tabbed(target) {
                this.targetTab = target;
            },

            // görevi datalistten siliyoruz
            deleteDataList(Id){
                // idsini aldığımız görevi ilk olarak datalistte varmı yokmu diye kontrol ediyoruz
                let data = this.dataList.find(todo => todo.Id === Id);
                // eğer boş ise false döndürüyoruz
                if (data === null){
                    alert('Todo Not Found ');
                    return false;
                }

                //data listte foreach döngüsünde undefined olduğunu için data list onu bir değişkene aktarıyoruz
                var thatList = this.dataList;

                // datalist değişkeninde dönüyoruz
                this.dataList.forEach(function (item,index) {
                    console.log(data);

                    // eğer data listin id si ve gönderilen id eşit ise değeri datalistten splice ediyoruz
                    if (item.Id === data.Id){
                        thatList.splice(index,1);
                    }

                });

            }
        },
        computed: {

            // Yeni Kategori kaydı yaptığımız computed property
            saveList() {
                // eğer gönderilen kategori mevcut data listte varsa false döndürüyoruz
                var tempData = this.dataList.find(x => x.Title === this.activeList);
                if (tempData != undefined){
                    alert(this.activeList + " is available in lists");
                    return false;
                }

                // eğer yoksa listenin içine ekliyoruz ve activelisti boşaltıyoruz
                this.lists.push({
                    name:this.activeList
                });
                this.activeList = '';
            },

            //Yeni Görev kaydı yaptığımız computed property


            addList() {
                // gönderilen görev listenin içinde varmı diye kontrol ediyıruz
                var tempData = this.lists.find(x => x.name === this.activeData);

                // eğer varsa bu görev var mesajı veriyoruz
                if (tempData != undefined){
                    alert(this.activeData + " is available in lists");
                    return false;
                }

                // eğer yoksa mevcut görevler listesine ekliyoruz
                this.dataList.push({
                    Id: this.activeData.length + 1,
                    Title:this.activeData,
                    Status:false,
                    List: this.targetTab
                });

                this.activeData = '';
            },

            //Yapılacak listesi

            todoList(){
                return this.dataList.filter(todo => todo.Status === false && todo.List === this.targetTab);

            },

            //Yapılmışlar listesi
            todoListFinished(){
                return this.dataList.filter(todo => todo.Status === true && todo.List === this.targetTab);
            },

        },



    })
})