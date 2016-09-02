defmodule ProbabilityWeighTingFunction.Host do
  alias ProbabilityWeighTingFunction.Main
  alias ProbabilityWeighTingFunction.Actions

  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def all_reset(data) do
    
    data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn { id, _ } ->
      {id,
        %{
          ansed: false,
          rate: [30, 60, 90],
          question: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5],
          add: %{"0" =>1000, "1" =>1000, "2" =>1000, "3" =>1000, "4" =>1000, "5" =>1000},
          plus: %{"0" =>1000, "1" =>1000, "2" =>1000, "3" =>1000, "4" =>1000, "5" =>1000},
          befor: %{"0" => -1, "1" => -1, "2" => -1, "3" => -1, "4" => -1, "5" => -1},
          down: %{"0" => false, "1" => false, "2" => false, "3" => false, "4" => false, "5" => false},
     state: 0,
          slideIndex: 0,
        }
      }
    end), %{}))
    data = data
           |>put_in([:anses],0)
    Actions.all_reset(data)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end