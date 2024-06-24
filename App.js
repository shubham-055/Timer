import { NavigationContainer } from "@react-navigation/native";
import { ColorProvider } from "./src/Theme/ThemeProvider";
import CTimer from "./src/screens/TimerClassBase";
import FTimer from "./src/screens/TimerFunctionalBase";
import ToDoList from "./src/screens/Todo";
import DrawerNav from "./src/Navigation/Drawer";


const App=()=>{
  return(
    // <CTimer />
    <NavigationContainer>
    <ColorProvider>
    <DrawerNav />
    </ColorProvider>
    </NavigationContainer>
  )
}
export default App;