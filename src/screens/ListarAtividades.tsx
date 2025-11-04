import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { Text } from "react-native";

export default function ListarAtividades({ navigation }: NavigationParameter<"ListarAtividades">) {
    return <SafeAreaView>
        <Text>Tela</Text>
    </SafeAreaView>;
}