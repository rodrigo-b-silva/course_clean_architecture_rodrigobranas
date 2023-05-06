import SimulateFreigth from "../../src/application/useCase/SimulateFreigth";
import DefaultFreigthCalculator from "../../src/domain/entity/DefaultFreigthCalculator";
import FixedFreigthCalculator from "../../src/domain/entity/FixedFreigthCalculator";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

test('Deve simular o frete com estratégia fixa', async function() {
    const itemRepository = new ItemRepositoryMemory();
    const fixedFreigthCalculator = new FixedFreigthCalculator();
    const simulateFreigth = new SimulateFreigth(fixedFreigthCalculator, itemRepository);
    const input = {
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ]
    }
    const output = await simulateFreigth.execute(input);
    expect(output.freight).toBe(50)
});

test('Deve simular o frete com estratégia default', async function() {
    const itemRepository = new ItemRepositoryMemory();
    const defaultFreigthCalculator = new DefaultFreigthCalculator();
    const simulateFreigth = new SimulateFreigth(defaultFreigthCalculator, itemRepository);
    const input = {
        orderItems: [
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 1 },
        ]
    }
    const output = await simulateFreigth.execute(input);
    expect(output.freight).toBe(240)
});