import SimulateFreigth from "../../../src/application/useCase/simulate_freight/SimulateFreigth";
import SimulateFreigthInput from "../../../src/application/useCase/simulate_freight/SimulateFreigthInput";
import DefaultFreigthCalculator from "../../../src/domain/entity/DefaultFreigthCalculator";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../../src/infra/repository/database/ItemRepositoryDatabase";

test("Deve simular o frete dos itens", async function () {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const freigthCalculator = new DefaultFreigthCalculator();
    const simulateFreigth = new SimulateFreigth(itemRepository, freigthCalculator);
    const input = new SimulateFreigthInput([
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
    ]);
    const output = await simulateFreigth.execute(input);
    expect(output.amount).toBe(260);

});
