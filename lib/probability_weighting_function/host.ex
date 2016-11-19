defmodule ProbabilityWeightingFunction.Host do
  alias ProbabilityWeightingFunction.Main
  alias ProbabilityWeightingFunction.Actions

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
      {id, Main.new_participant(data)}
    end), %{}))
    data = data
           |>put_in([:anses],0)
    Actions.all_reset(data)
  end

  def update_question(data, question_text) do
    data = data |> Map.put(:money, question_text["money"])
                    |> Map.put(:add, question_text["add"])
                    |> Map.put(:unit, question_text["unit"])
                    |> Map.put(:participants, data.participants 
                    |> Enum.map(fn {key, value} -> {key, value 
                    |> Map.put(:money, question_text["money"])
                    |> Map.put(:add, %{"0" =>question_text["add"], "1" =>question_text["add"], "2" =>question_text["add"], "3" =>question_text["add"], "4" =>question_text["add"], "5" =>question_text["add"]})
                    |> Map.put(:plus, %{"0" =>question_text["add"], "1" =>question_text["add"], "2" =>question_text["add"], "3" =>question_text["add"], "4" =>question_text["add"], "5" =>question_text["add"]})
                    |> Map.put(:unit, question_text["unit"])} end)
                    |> Enum.into(%{}))
    Actions.update_question(data, question_text)
  end

  # Utilities
  def format_contents(data) do
    data
  end
end
