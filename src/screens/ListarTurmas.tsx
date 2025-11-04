import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { Text } from "react-native";

export default function ListarTurmas({ navigation }: NavigationParameter<"ListarTurmas">) {
    return <SafeAreaView>
        <Text>Tela</Text>
    </SafeAreaView>;
}