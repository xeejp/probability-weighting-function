defmodule ProbabilityWeighTingFunction.Main do
  alias ProbabilityWeighTingFunction.Actions

  @pages ["waiting", "experiment", "result"]

  def pages, do: @pages

  def init do
    %{
      page: "waiting",
      participants: %{},
      anses: 0,
      money: 1000,
      unit: "円",
    }
  end

  def new_participant(data) do
    %{
      ansed: false,
      rate: [30, 60, 90],
      question: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5],
      add: 1000,
      befor: -1,
      state: 0, # 0->waitng,1->answering,2->answered
      slideIndex: 0,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end