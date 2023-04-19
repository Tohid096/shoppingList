import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
   const appSetting = {databaseURL:"https://accesweb-18735-default-rtdb.europe-west1.firebasedatabase.app"
    }
    
    const app = initializeApp(appSetting)
    const database = getDatabase(app)
    const ItemInDb = ref(database,"Item")
    //console.log(app)
      
    const ItemName=document.getElementById("item")
    const addButton=document.getElementById("addbtn")
    const shoppingListEl = document.getElementById("shopping-list")
    
    addButton.addEventListener("click", function(){
        let inputValue
        inputValue=ItemName.value
        push(ItemInDb,inputValue)
        
       //Duplication  addingItemToShoppingListEl(inputValue)
        
        clearInputName()    
    })
    
    
    
    onValue(ItemInDb,function(snapshot){
    
        if(snapshot.exists()){
        let Items=Object.entries(snapshot.val())
        
        //console.log(snapshot.val())
        //console.log(Items)
       clearShoppingListEl()
        for(let i =0 ; i<Items.length;i++){
            let currentItem=Items[i]
            let currentItemValue=currentItem[1]
            let currentItemId=currentItem[0]
            addingItemToShoppingListEl(currentItem)
            //console.log(Items[i])
        }
        }
        else{
            shoppingListEl.innerHTML = "No items here yet"
        }
    })
    
    
    function clearShoppingListEl(){
        shoppingListEl.innerHTML =" "
    }
    
    
    
    function clearInputName(){
        ItemName.value=""
    }
    
    function addingItemToShoppingListEl(Items){
        //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
        let itemId = Items[0]
        let itemValue = Items[1]
        let newEl
        newEl = document.createElement("li")
        newEl.textContent = `${itemValue}`
        newEl.addEventListener("click", function(){
            //console.log(itemId)
            
            let exactLocation= ref(database,`Item/${itemId}`)
            remove(exactLocation)
        })
        
        shoppingListEl.append(newEl)
    }
